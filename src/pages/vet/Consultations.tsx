import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { MobileHeader } from '@/components/MobileHeader';
import { Button } from '@/components/ui/button';
import { Stethoscope, Calendar, ChevronRight } from 'lucide-react';

interface Consultation {
  id: string;
  animalName: string;
  date: string;
  diagnosis: string;
  treatment: string;
  createdAt: string;
}

const Consultations = () => {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('univet_consultations') || '[]');
    // Ordenar por data mais recente
    const sorted = stored.sort((a: Consultation, b: Consultation) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setConsultations(sorted);
  }, []);

  return (
    <MobileLayout>
      <MobileHeader title="Minhas Consultas" />

      <div className="px-6 py-6 space-y-4">
        {consultations.length > 0 ? (
          consultations.map((consultation) => (
            <button
              key={consultation.id}
              onClick={() => navigate(`/vet/consultation/${consultation.id}`)}
              className="w-full mobile-card hover:shadow-lg transition-all active:scale-95"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>

                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold mb-1">{consultation.animalName}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {consultation.diagnosis}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(consultation.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </button>
          ))
        ) : (
          <div className="mobile-card text-center py-12">
            <Stethoscope className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold text-lg mb-2">Nenhuma consulta registrada</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Registre sua primeira consulta
            </p>
            <Button
              onClick={() => navigate('/vet/consultation/new')}
              className="gradient-primary"
            >
              Registrar Consulta
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Consultations;
