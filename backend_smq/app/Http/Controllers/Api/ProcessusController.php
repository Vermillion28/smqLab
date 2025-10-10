<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Processus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProcessusController extends Controller
{
    public function __construct()
    {
        // on protège toutes les routes : nécessite authentification via Sanctum
        $this->middleware('auth:sanctum');
    }

    // GET /api/processus
    public function index()
    {
        $processus = Processus::with(['responsable', 'createur'])->orderBy('created_at','desc')->get();
        return response()->json(['success' => true, 'data' => $processus], 200);
    }

    // POST /api/processus
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'responsable_name' => 'required|string|exists:users,name',
    ]);

    if ($validator->fails()) {
        return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
    }

    // Récupérer l'id du responsable depuis son nom
    $responsable = \App\Models\User::where('name', $request->responsable_name)->first();

    $processus = Processus::create([
        'name' => $request->name,
        'description' => $request->description,
        'responsable_id' => $responsable->id,
        'created_by' => Auth::id(),
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Processus créé avec succès',
        'data' => $processus
    ], 201);
}

    // GET /api/processus/{id}
    public function show($id)
    {
        $processus = Processus::with(['responsable', 'createur'])->find($id);

        if (!$processus) {
            return response()->json(['success' => false, 'message' => 'Processus non trouvé'], 404);
        }

        return response()->json(['success' => true, 'data' => $processus], 200);
    }

    // PUT /api/processus/{id}
    public function update(Request $request, $id)
{
    $processus = Processus::find($id);
    if (!$processus) {
        return response()->json(['success' => false, 'message' => 'Processus non trouvé'], 404);
    }

    $validator = Validator::make($request->all(), [
        'name' => 'sometimes|required|string|max:255',
        'description' => 'nullable|string',
        'responsable_name' => 'sometimes|required|string|exists:users,name',
    ]);

    if ($validator->fails()) {
        return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
    }

    // Si le nom du responsable est fourni, on récupère l'id
    if ($request->has('responsable_name')) {
        $responsable = \App\Models\User::where('name', $request->responsable_name)->first();
        $request->merge(['responsable_id' => $responsable->id]);
    }

    $processus->update($request->only(['name', 'description', 'responsable_id']));

    return response()->json([
        'success' => true,
        'message' => 'Processus mis à jour',
        'data' => $processus
    ], 200);
}


    // DELETE /api/processus/{id}
    public function destroy($id)
    {
        $processus = Processus::find($id);
        if (!$processus) {
            return response()->json(['success' => false, 'message' => 'Processus non trouvé'], 404);
        }

        $processus->delete();

        return response()->json(['success' => true, 'message' => 'Processus supprimé'], 200);
    }
}
