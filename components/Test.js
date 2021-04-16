export default function Test({ name }) {
  const changeNumberFormat = (num)=>{
   return new Intl.NumberFormat('en-IN').format(num);
  }
  return <div>
    {name.map((state) => {
      if (state.state != 'State Unassigned') {
        return (
        <div key={state.state}>
          <h2>{state.state}</h2>
            <p>Confirmed: <span>{changeNumberFormat(state.confirmed)}</span> <span>{state.deltaconfirmed != '0' && `+${changeNumberFormat(state.deltaconfirmed)}`}</span></p>
          <p>Active: <span>{changeNumberFormat(state.active)}</span></p>
          <p>Recovered: <span>{changeNumberFormat(state.recovered)}</span></p>
          <p>Deceased: <span>{changeNumberFormat(state.deaths)}</span></p>
      </div>
      )
      }
      
    })}
  </div>;
}
