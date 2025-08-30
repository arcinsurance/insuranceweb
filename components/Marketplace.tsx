import React, { useState } from 'react';

const Marketplace = () => {
  const [state, setState] = useState('FL');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [zipcode, setZipcode] = useState('');
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [household, setHousehold] = useState('1');
  const [plans, setPlans] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPlans(null);
    try {
      // 1. Obtener countyfips según zipcode
      const countyRes = await fetch(`https://insuranceweb.onrender.com/api/marketplace/counties?zipcode=${zipcode}`);
      const countyData = await countyRes.json();
      if (!countyRes.ok || !Array.isArray(countyData) || !countyData[0]?.countyfips) {
        throw new Error('No se pudo obtener el countyfips para el código postal ingresado');
      }
      const countyfips = countyData[0].countyfips;

      // 2. Buscar planes usando el countyfips obtenido
      const res = await fetch('https://insuranceweb.onrender.com/api/marketplace/plans/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          household: {
            income: Number(income),
            people: [
              {
                age: Number(age),
                aptc_eligible: true, // Puedes ajustar según tu lógica
                gender: "Female",   // Puedes hacer esto dinámico si tienes el dato
                uses_tobacco: false  // Puedes hacer esto dinámico si tienes el dato
              }
            ]
          },
          market: "Individual",
          place: {
            countyfips,
            state,
            zipcode
          },
          year: Number(year)
        })
      });
      if (!res.ok) throw new Error('No se encontraron planes o hubo un error en la búsqueda');
      const data = await res.json();
      setPlans(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001' }}>
      <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, color: '#1a365d', marginBottom: 24 }}>
        Cotiza tu Plan de Salud Marketplace
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 28 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1a365d' }}>Estado
              <input value={state} onChange={e => setState(e.target.value.toUpperCase())} maxLength={2} required
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', marginTop: 4 }} placeholder="Ej: FL" />
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1a365d' }}>Año
              <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} min={2020} max={2100} required
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', marginTop: 4 }} />
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1a365d' }}>Código Postal
              <input value={zipcode} onChange={e => setZipcode(e.target.value)} maxLength={10} required
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', marginTop: 4 }} placeholder="Ej: 33101" />
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1a365d' }}>Edad del solicitante
              <input type="number" value={age} onChange={e => setAge(e.target.value)} min={0} max={120} required
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', marginTop: 4 }} placeholder="Ej: 35" />
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1a365d' }}>Ingresos anuales del hogar (USD)
              <input type="number" value={income} onChange={e => setIncome(e.target.value)} min={0} required
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', marginTop: 4 }} placeholder="Ej: 35000" />
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1a365d' }}>Miembros del hogar
              <input type="number" value={household} onChange={e => setHousehold(e.target.value)} min={1} max={20} required
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1', marginTop: 4 }} placeholder="Ej: 3" />
            </label>
          </div>
        </div>
        <button type="submit" style={{ marginTop: 12, background: '#f97316', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 18, boxShadow: '0 2px 8px #f9731622', cursor: 'pointer', transition: 'background 0.2s' }}>
          {loading ? 'Buscando...' : 'Buscar Planes'}
        </button>
      </form>
      {error && <p style={{ color: '#e53e3e', textAlign: 'center', marginBottom: 16 }}>{error}</p>}
      {plans && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ color: '#1a365d', fontWeight: 600, fontSize: 20, marginBottom: 12 }}>Resultados:</h3>
          <pre style={{ background: '#f6f6f6', padding: 16, borderRadius: 8, maxHeight: 350, overflow: 'auto', fontSize: 14 }}>{JSON.stringify(plans, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
