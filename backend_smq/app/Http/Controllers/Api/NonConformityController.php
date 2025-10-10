<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NonConformity;
use App\Models\Processus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NonConformityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // GET /api/non-conformities
    public function index()
    {
        $nonConformities = NonConformity::with(['process', 'creator'])->orderBy('created_at', 'desc')->get();
        return response()->json(['success' => true, 'data' => $nonConformities], 200);
    }

    // POST /api/non-conformities
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|unique:non_conformities,code',
            'title' => 'required|string|max:255',
            'process_name' => 'required|string|exists:processus,name',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        // récupérer l'id du processus via le nom
        $process = Processus::where('name', $request->process_name)->first();
        if (!$process) {
    return response()->json(['success' => false, 'message' => 'Processus introuvable'], 404);
}


        $nonConformity = NonConformity::create([
            'code' => $request->code,
            'title' => $request->title,
            'process_id' => $process->id,
            'description' => $request->description,
            'created_by' => Auth::id(),
        ]);

        return response()->json(['success' => true, 'message' => 'Non-conformité créée avec succès', 'data' => $nonConformity], 201);
    }

    // GET /api/non-conformities/{id}
    public function show($id)
    {
        $nonConformity = NonConformity::with(['process', 'creator'])->find($id);
        if (!$nonConformity) {
            return response()->json(['success' => false, 'message' => 'Non-conformité non trouvée'], 404);
        }

        return response()->json(['success' => true, 'data' => $nonConformity], 200);
    }

    // PUT /api/non-conformities/{id}
    public function update(Request $request, $id)
    {
        $nonConformity = NonConformity::find($id);
        if (!$nonConformity) {
            return response()->json(['success' => false, 'message' => 'Non-conformité non trouvée'], 404);
        }

        $validator = Validator::make($request->all(), [
            'code' => 'sometimes|required|string|unique:non_conformities,code,'.$id,
            'title' => 'sometimes|required|string|max:255',
            'process_name' => 'sometimes|required|string|exists:processus,name',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        if ($request->has('process_name')) {
            $process = Processus::where('name', $request->process_name)->first();
            $nonConformity->process_id = $process->id;
        }

        $nonConformity->update($request->only(['code', 'title', 'description']));

        return response()->json(['success' => true, 'message' => 'Non-conformité mise à jour', 'data' => $nonConformity], 200);
    }

    // DELETE /api/non-conformities/{id}
    public function destroy($id)
    {
        $nonConformity = NonConformity::find($id);
        if (!$nonConformity) {
            return response()->json(['success' => false, 'message' => 'Non-conformité non trouvée'], 404);
        }

        $nonConformity->delete();

        return response()->json(['success' => true, 'message' => 'Non-conformité supprimée'], 200);
    }
}
