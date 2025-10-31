import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { MobileHeader } from '@/components/MobileHeader';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Animal {
  id: string;
  name: string;
}

const AppointmentNew = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [formData, setFormData] = useState({
    animalId: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });

  useEffect(() => {
    const storedAnimals = JSON.parse(localStorage.getItem('univet_animals') || '[]');
    setAnimals(storedAnimals);
  }, []);

  const appointmentTypes = [
    'Consulta de rotina',
    'Vacinação',
    'Retorno',
    'Emergência',
    'Exame',
    'Cirurgia'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSubmit = () => {
    if (!formData.animalId || !formData.date || !formData.time || !formData.type) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Salvar no localStorage (mock)
    const appointments = JSON.parse(localStorage.getItem('univet_appointments') || '[]');
    const newAppointment = {
      id: Date.now().toString(),
      ...formData,
      animal: animals.find(a => a.id === formData.animalId)?.name || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    appointments.push(newAppointment);
    localStorage.setItem('univet_appointments', JSON.stringify(appointments));

    toast.success('Agendamento solicitado com sucesso!');
    navigate('/tutor/appointments');
  };

  return (
    <MobileLayout showBottomNav={false}>
      <MobileHeader title="Novo Agendamento" showBack />

      <div className="px-6 py-6">
        <div className="mobile-card space-y-4">
          <div className="space-y-2">
            <Label htmlFor="animal">Animal *</Label>
            <Select value={formData.animalId} onValueChange={(value) => setFormData({ ...formData, animalId: value })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione o animal" />
              </SelectTrigger>
              <SelectContent>
                {animals.map((animal) => (
                  <SelectItem key={animal.id} value={animal.id}>
                    {animal.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Consulta *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Horário *</Label>
            <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione o horário" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Descreva os sintomas ou motivo da consulta..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="min-h-24"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-12 text-base font-semibold gradient-primary mt-6"
          >
            Solicitar Agendamento
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default AppointmentNew;
