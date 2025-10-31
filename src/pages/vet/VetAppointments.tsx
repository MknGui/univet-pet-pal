import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { MobileHeader } from '@/components/MobileHeader';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Appointment {
  id: string;
  animal: string;
  tutor: string;
  date: string;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'completed';
}

const VetAppointments = () => {
  const navigate = useNavigate();
  
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      animal: 'Thor',
      tutor: 'João Silva',
      date: '2025-11-05',
      time: '14:30',
      type: 'Consulta de rotina',
      status: 'confirmed'
    },
    {
      id: '2',
      animal: 'Luna',
      tutor: 'Maria Santos',
      date: '2025-11-05',
      time: '15:30',
      type: 'Vacinação',
      status: 'pending'
    },
    {
      id: '3',
      animal: 'Max',
      tutor: 'Pedro Costa',
      date: '2025-11-04',
      time: '10:00',
      type: 'Retorno',
      status: 'completed'
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
      <MobileHeader title="Agenda" />

      <div className="px-6 py-6 space-y-4">
        {appointments.map((appointment) => (
          <button
            key={appointment.id}
            onClick={() => navigate(`/vet/appointment/${appointment.id}`)}
            className="w-full mobile-card hover:shadow-lg transition-all active:scale-95"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
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

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <User className="w-4 h-4" />
              <span>Tutor: {appointment.tutor}</span>
            </div>
          </button>
        ))}
      </div>
    </MobileLayout>
  );
};

export default VetAppointments;
