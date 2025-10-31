import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { MobileHeader } from '@/components/MobileHeader';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Appointment {
  id: string;
  animal: string;
  date: string;
  time: string;
  vet: string;
  type: string;
  status: 'pending' | 'confirmed' | 'completed';
  location: string;
}

const Appointments = () => {
  const navigate = useNavigate();
  
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      animal: 'Thor',
      date: '2025-11-05',
      time: '14:30',
      vet: 'Dra. Maria Santos',
      type: 'Consulta de rotina',
      status: 'confirmed',
      location: 'Clínica Veterinária Centro'
    },
    {
      id: '2',
      animal: 'Luna',
      date: '2025-10-28',
      time: '10:00',
      vet: 'Dr. João Silva',
      type: 'Vacinação',
      status: 'completed',
      location: 'Clínica Veterinária Norte'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
  };

  return (
    <MobileLayout>
      <MobileHeader
        title="Agendamentos"
        action={
          <Button
            size="icon"
            onClick={() => navigate('/tutor/appointment/new')}
            className="h-9 w-9 gradient-primary"
          >
            <Plus className="h-5 w-5" />
          </Button>
        }
      />

      <div className="px-6 py-6 space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} className="mobile-card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{appointment.animal}</h3>
                    <p className="text-xs text-muted-foreground">{appointment.type}</p>
                  </div>
                </div>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full border font-medium",
                  getStatusBadge(appointment.status)
                )}>
                  {getStatusLabel(appointment.status)}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{appointment.location}</span>
                </div>
                <p className="text-muted-foreground pt-1">
                  Com {appointment.vet}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/tutor/appointment/${appointment.id}`);
                  }}
                  size="sm" 
                  className="flex-1 gradient-primary"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="mobile-card text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold text-lg mb-2">Nenhum agendamento</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Agende sua primeira consulta veterinária
            </p>
            <Button
              onClick={() => navigate('/tutor/appointment/new')}
              className="gradient-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agendar Consulta
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Appointments;
