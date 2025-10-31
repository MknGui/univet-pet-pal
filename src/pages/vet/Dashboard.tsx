import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MobileLayout } from '@/components/MobileLayout';
import { Stethoscope, Calendar, ClipboardList, Bell, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VetDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickActions = [
    {
      icon: Stethoscope,
      label: 'Registrar Consulta',
      description: 'Nova consulta',
      path: '/vet/consultation/new',
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      icon: ClipboardList,
      label: 'Minhas Consultas',
      description: 'Histórico',
      path: '/vet/consultations',
      color: 'bg-green-500/10 text-green-600'
    },
    {
      icon: Calendar,
      label: 'Agenda',
      description: 'Ver horários',
      path: '/vet/appointments',
      color: 'bg-purple-500/10 text-purple-600'
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      animal: 'Thor',
      tutor: 'João Silva',
      date: '2025-11-05',
      time: '14:30',
      type: 'Consulta de rotina'
    },
    {
      id: 2,
      animal: 'Luna',
      tutor: 'Maria Santos',
      date: '2025-11-05',
      time: '15:30',
      type: 'Vacinação'
    }
  ];

  return (
    <MobileLayout>
      <div className="gradient-hero pb-8">
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Bem-vindo(a),</p>
              <h1 className="text-2xl font-bold text-foreground">{user?.name}</h1>
              {user?.crmv && (
                <p className="text-sm text-primary font-medium mt-1">{user.crmv}</p>
              )}
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  className="mobile-card text-left hover:shadow-lg transition-all active:scale-95"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{action.label}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Agenda de Hoje</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/vet/appointments')}
            className="text-primary"
          >
            Ver todas
          </Button>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <button
                key={appointment.id}
                onClick={() => navigate('/vet/appointments')}
                className="w-full mobile-card hover:shadow-lg transition-all active:scale-95"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{appointment.time}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {appointment.type}
                      </span>
                    </div>
                    <p className="text-sm mb-1">
                      <span className="font-medium">{appointment.animal}</span>
                      {' • '}
                      <span className="text-muted-foreground">Tutor: {appointment.tutor}</span>
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mobile-card text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">
              Nenhuma consulta agendada para hoje
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="mobile-card text-center">
            <Stethoscope className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Consultas</p>
          </div>
          <div className="mobile-card text-center">
            <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-muted-foreground">Hoje</p>
          </div>
          <div className="mobile-card text-center">
            <ClipboardList className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">45</p>
            <p className="text-xs text-muted-foreground">Registros</p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default VetDashboard;
