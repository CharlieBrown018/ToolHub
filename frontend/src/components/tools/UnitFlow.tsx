import { useState, useEffect } from 'react';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '../ui/glass-card';
import { GlassButton } from '../ui/glass-button';
import { ToolLayout } from '../layouts/ToolLayout';
import { PageTransition } from '../animations/PageTransition';
import { ArrowsLeftRight, Scales, Ruler, Thermometer, Database } from '@phosphor-icons/react';
import { GlassSelect } from '../ui/glass-select';

const UNIT_TYPES = [
  { id: 'length', name: 'Length', icon: Ruler },
  { id: 'weight', name: 'Weight', icon: Scales },
  { id: 'temperature', name: 'Temperature', icon: Thermometer },
  { id: 'data', name: 'Data', icon: Database },
];

const UNITS = {
  length: [
    { value: 'm', label: 'Meters', factor: 1 },
    { value: 'km', label: 'Kilometers', factor: 1000 },
    { value: 'cm', label: 'Centimeters', factor: 0.01 },
    { value: 'mm', label: 'Millimeters', factor: 0.001 },
    { value: 'mi', label: 'Miles', factor: 1609.34 },
    { value: 'yd', label: 'Yards', factor: 0.9144 },
    { value: 'ft', label: 'Feet', factor: 0.3048 },
    { value: 'in', label: 'Inches', factor: 0.0254 },
  ],
  weight: [
    { value: 'kg', label: 'Kilograms', factor: 1 },
    { value: 'g', label: 'Grams', factor: 0.001 },
    { value: 'lb', label: 'Pounds', factor: 0.453592 },
    { value: 'oz', label: 'Ounces', factor: 0.0283495 },
  ],
  temperature: [
    { value: 'c', label: 'Celsius' },
    { value: 'f', label: 'Fahrenheit' },
    { value: 'k', label: 'Kelvin' },
  ],
  data: [
    { value: 'b', label: 'Bytes', factor: 1 },
    { value: 'kb', label: 'Kilobytes', factor: 1024 },
    { value: 'mb', label: 'Megabytes', factor: 1024 ** 2 },
    { value: 'gb', label: 'Gigabytes', factor: 1024 ** 3 },
    { value: 'tb', label: 'Terabytes', factor: 1024 ** 4 },
  ],
};

export default function UnitFlow() {
  const [type, setType] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const convert = () => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) {
      setToValue('');
      return;
    }

    if (type === 'temperature') {
      let celsius;
      if (fromUnit === 'c') celsius = val;
      else if (fromUnit === 'f') celsius = (val - 32) * 5/9;
      else celsius = val - 273.15;

      let result;
      if (toUnit === 'c') result = celsius;
      else if (toUnit === 'f') result = (celsius * 9/5) + 32;
      else result = celsius + 273.15;
      
      setToValue(result.toFixed(2));
    } else {
      const units = UNITS[type as keyof typeof UNITS];
      const fromFactor = units.find(u => u.value === fromUnit)?.factor || 1;
      const toFactor = units.find(u => u.value === toUnit)?.factor || 1;
      const result = (val * fromFactor) / toFactor;
      setToValue(result.toString());
    }
  };

  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit, type]);

  useEffect(() => {
    const defaultUnits = UNITS[type as keyof typeof UNITS];
    setFromUnit(defaultUnits[0].value);
    setToUnit(defaultUnits[1].value);
  }, [type]);

  return (
    <PageTransition>
      <ToolLayout
        title="UnitFlow"
        subtitle="Universal unit converter for dimensions, weight, and more"
        icon={ArrowsLeftRight}
        iconColor="cyan"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Category Selection & From Input */}
          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-cyan-500/30 h-full">
              <GlassCardHeader>
                <GlassCardTitle>Conversion Settings</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                  {UNIT_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                        type === t.id 
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-glass-sm' 
                        : 'bg-glass-white-sm border-glass-border text-gray-400 hover:bg-glass-white-md hover:text-gray-200'
                      }`}
                    >
                      <t.icon className="h-6 w-6" weight={type === t.id ? "fill" : "duotone"} />
                      <span className="text-xs font-bold uppercase tracking-wider">{t.name}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-glass-border">
                  <div className="bg-glass-white-md backdrop-blur-md border border-glass-border rounded-xl p-4 focus-within:ring-2 focus-within:ring-cyan-500/30 transition-all">
                    <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">From</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        value={fromValue}
                        onChange={(e) => setFromValue(e.target.value)}
                        className="flex-1 bg-transparent text-3xl font-bold text-white outline-none min-w-0"
                      />
                    </div>
                  </div>
                  <GlassSelect
                    value={fromUnit}
                    onValueChange={setFromUnit}
                    options={UNITS[type as keyof typeof UNITS]}
                    placeholder="Select Unit"
                  />
                </div>

                <GlassButton 
                  variant="outline" 
                  className="w-full border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10"
                  onClick={() => {
                    const tempValue = fromValue;
                    const tempUnit = fromUnit;
                    setFromValue(toValue);
                    setFromUnit(toUnit);
                    setToUnit(tempUnit);
                  }}
                >
                  <ArrowsLeftRight className="mr-2 h-4 w-4" /> Swap Units
                </GlassButton>
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Right Column: Result Display */}
          <div className="space-y-6">
            <GlassCard hover={false} animated={false} className="border-cyan-500/30 h-full flex flex-col">
              <GlassCardHeader>
                <GlassCardTitle>Conversion Result</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="flex-1 flex flex-col justify-center space-y-8">
                <div className="bg-glass-white-md backdrop-blur-md border border-glass-border rounded-xl p-8 text-center shadow-glass-inner">
                  <label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Converted Value</label>
                  <div className="text-4xl sm:text-5xl font-bold text-cyan-400 truncate tracking-tight">
                    {toValue || '0'}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block px-1">To Unit</label>
                  <GlassSelect
                    value={toUnit}
                    onValueChange={setToUnit}
                    options={UNITS[type as keyof typeof UNITS]}
                    placeholder="Select Unit"
                  />
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        </div>
      </ToolLayout>
    </PageTransition>
  );
}
