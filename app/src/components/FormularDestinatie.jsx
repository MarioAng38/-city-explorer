import { useState } from "react";

export default function FormularDestinatie({ onAdd }) {
  const [oras, setOras] = useState("");
  const [tara, setTara] = useState("");
  const [zile, setZile] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!oras.trim() || !tara.trim()) {
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      oras: oras.trim(),
      tara: tara.trim(),
      zile: Number(zile),
      vizitat: false,
    });

    setOras("");
    setTara("");
    setZile("");
  }

  return (
    <form className="formular" onSubmit={handleSubmit}>
      <label>
        Oraș
        <input
          type="text"
          value={oras}
          onChange={(event) => setOras(event.target.value)}
        />
      </label>
      <label>
        tara
        <input
          type="text"
          value={tara}
          onChange={(event) => setTara(event.target.value)}
        />
      </label>
      <label>
        Numar de zile
        <input
          type="number"
          value={zile}
          onChange={(event) => setZile(event.target.value)}
        />
      </label>
      <button type="submit">Adauga destinatia</button>
    </form>
  );
}
