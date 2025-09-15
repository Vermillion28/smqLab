import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, MapPin } from "lucide-react";

const audits = [
  {
    id: "AUD-2024-001",
    title: "Audit Interne ISO 9001",
    description: "Audit de conformité aux exigences ISO 9001:2015",
    status: "Planifié",
    type: "Interne",
    auditor: "Pierre Durand",
    department: "Production",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    progress: 0
  },
  {
    id: "AUD-2024-002",
    title: "Audit Qualité Produit",
    description: "Vérification des processus de contrôle qualité",
    status: "En cours",
    type: "Interne",
    auditor: "Marie Dubois",
    department: "Qualité",
    startDate: "2024-01-08",
    endDate: "2024-01-10",
    progress: 65
  },
  {
    id: "AUD-2023-045",
    title: "Audit Certification Externe",
    description: "Audit de surveillance par l'organisme certificateur",
    status: "Terminé",
    type: "Externe",
    auditor: "Organisme Externe",
    department: "Général",
    startDate: "2023-12-15",
    endDate: "2023-12-17",
    progress: 100
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Planifié": return "bg-blue-100 text-blue-800";
    case "En cours": return "bg-yellow-100 text-yellow-800";
    case "Terminé": return "bg-green-100 text-green-800";
    case "Annulé": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getTypeColor = (type: string) => {
  return type === "Interne" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800";
};

export default function Audits() {
  return (
    <div className="flex-1 bg-dashboard-bg min-h-screen">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Search className="h-8 w-8 text-purple-600" />
            Audits
          </h1>
          <p className="text-muted-foreground">Programme d'audit et suivi des conformités</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-dashboard-card border-dashboard-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Audits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">47</div>
            </CardContent>
          </Card>
          
          <Card className="bg-dashboard-card border-dashboard-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">En cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">7</div>
            </CardContent>
          </Card>
          
          <Card className="bg-dashboard-card border-dashboard-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Planifiés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12</div>
            </CardContent>
          </Card>
          
          <Card className="bg-dashboard-card border-dashboard-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Terminés cette année</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">28</div>
            </CardContent>
          </Card>
        </div>

        {/* Audits List */}
        <Card className="bg-dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle>Programme d'Audit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {audits.map((audit) => (
                <div key={audit.id} className="border border-dashboard-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{audit.id}</h3>
                      <Badge className={getStatusColor(audit.status)}>{audit.status}</Badge>
                      <Badge className={getTypeColor(audit.type)}>{audit.type}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{audit.department}</div>
                  </div>
                  
                  <h4 className="font-medium text-foreground mb-2">{audit.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{audit.description}</p>
                  
                  {audit.status === "En cours" && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-foreground">Progression</span>
                        <span className="text-sm text-muted-foreground">{audit.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${audit.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {audit.auditor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {audit.startDate} - {audit.endDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {audit.department}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}