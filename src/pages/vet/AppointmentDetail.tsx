import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { MobileHeader } from '@/components/MobileHeader';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, FileText, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Appointment {
  id: string;
  animal: string;
  tutor: string;
  date: string;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'completed';
  notes?: string;
}

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    // Mock data - em produção viria do localStorage ou API
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        animal: 'Thor',
        tutor: 'João Silva',
        date: '2025-11-05',
        time: '14:30',
        type: 'Consulta de rotina',
        status: 'confirmed',
        notes: 'Animal apresenta bom estado geral'
      },
      {
        id: '2',
        animal: 'Luna',
        tutor: 'Maria Santos',
        date: '2025-11-05',
        time: '15:30',
        type: 'Vacinação',
        status: 'pending'
      }
    ];

    const found = mockAppointments.find((a) => a.id === id);
    
    if (!found) {
      toast.error('Agendamento não encontrado');
      navigate('/vet/appointments');
      return;
    }
    
    setAppointment(found);
  }, [id, navigate]);

  const handleConfirm = () => {
    if (appointment) {
      setAppointment({ ...appointment, status: 'confirmed' });
      toast.success('Agendamento confirmado');
    }
  };

  const handleComplete = () => {
    toast.success('Agendamento concluído');
    navigate('/vet/consultation/new');
  };

  if (!appointment) {
    return null;
  }

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
    <MobileLayout showBottomNav={false}>
      <MobileHeader title="Detalhes do Agendamento" showBack />

      <div className="px-6 py-6 space-y-6">
        {/* Status Badge */}
        <div className="flex justify-center">
          <span className={cn(
            "inline-block px-4 py-2 rounded-full border text-sm font-medium",
            getStatusBadge(appointment.status)
          )}>
            {getStatusLabel(appointment.status)}
          </span>
        </div>

        {/* Main Info */}
        <div className="mobile-card space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{appointment.animal}</h2>
              <p className="text-sm text-muted-foreground">{appointment.type}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Data e Hora</p>
                <p className="font-semibold">
                  {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Tutor</p>
                <p className="font-semibold">{appointment.tutor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {appointment.notes && (
          <div className="mobile-card">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Observações</h3>
            </div>
            <p className="text-sm text-muted-foreground">{appointment.notes}</p>
          </div>
        )}

        {/* Actions */}
        {appointment.status !== 'completed' && (
          <div className="space-y-3">
            {appointment.status === 'pending' && (
              <Button
                onClick={handleConfirm}
                className="w-full h-12 gradient-primary"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmar Agendamento
              </Button>
            )}

            {appointment.status === 'confirmed' && (
              <Button
                onClick={handleComplete}
                className="w-full h-12 gradient-primary"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Registrar Consulta
              </Button>
            )}

            <Button
              variant="outline"
              className="w-full h-12 text-destructive hover:bg-destructive/10 border-destructive/20"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancelar Agendamento
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default AppointmentDetail;
