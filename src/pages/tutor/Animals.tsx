import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { MobileHeader } from '@/components/MobileHeader';
import { Button } from '@/components/ui/button';
import { Plus, Dog, Cat, ChevronRight } from 'lucide-react';

interface Animal {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed: string;
  age: string;
  sex: 'male' | 'female';
}

const Animals = () => {
  const navigate = useNavigate();
  
  // Mock data - substituir por dados reais do localStorage
  const [animals] = useState<Animal[]>([
    {
      id: '1',
      name: 'Thor',
      species: 'dog',
      breed: 'Golden Retriever',
      age: '3 anos',
      sex: 'male'
    },
    {
      id: '2',
      name: 'Luna',
      species: 'cat',
      breed: 'Siamês',
      age: '2 anos',
      sex: 'female'
    }
  ]);

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case 'dog':
        return Dog;
      case 'cat':
        return Cat;
      default:
        return Dog;
    }
  };

  return (
    <MobileLayout>
      <MobileHeader 
        title="Meus Animais" 
        action={
          <Button
            size="icon"
            onClick={() => navigate('/tutor/animal/new')}
            className="h-9 w-9 gradient-primary"
          >
            <Plus className="h-5 w-5" />
          </Button>
        }
      />

      <div className="px-6 py-6 space-y-4">
        {animals.length > 0 ? (
          animals.map((animal) => {
            const SpeciesIcon = getSpeciesIcon(animal.species);
            
            return (
              <button
                key={animal.id}
                onClick={() => navigate(`/tutor/animal/${animal.id}`)}
                className="w-full mobile-card hover:shadow-lg transition-all active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <SpeciesIcon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-lg mb-1 truncate">{animal.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{animal.breed}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{animal.age}</span>
                      <span>•</span>
                      <span>{animal.sex === 'male' ? 'Macho' : 'Fêmea'}</span>
                    </div>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </button>
            );
          })
        ) : (
          <div className="mobile-card text-center py-12">
            <Dog className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold text-lg mb-2">Nenhum animal cadastrado</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Cadastre seu pet para começar a usar o UNIVET
            </p>
            <Button
              onClick={() => navigate('/tutor/animal/new')}
              className="gradient-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Animal
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Animals;
