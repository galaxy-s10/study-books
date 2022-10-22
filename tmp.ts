// pets: string[]
const pets = ['cat', 'dog'];

pets[0] = 'fish';

// readonly ["cat", "dog"]
const pets1 = ['cat', 'dog'] as const;

pets1[0] = 'fish';
Object.defineProperty;
