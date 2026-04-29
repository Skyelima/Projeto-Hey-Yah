# Data Model: Gamification & Alerts

## Entidade: `UserData` (Extensão no LocalStorage)

A estrutura atual de `userData` no `localStorage` será expandida para conter o progresso do pet virtual.

```javascript
// Exemplo de como ficará salvo no LocalStorage sob a chave "heyya_userData" (ou similar)
{
  "nome": "Kamila",
  "escala": "flexivel",
  // Novos campos:
  "pet": {
    "tipo": "pinguim",
    "xp": 150,
    "estagioAtual": 1, // 0 = Ovo, 1 = Bebê, 2 = Jovem, 3 = Adulto
    "itensDesbloqueados": ["chapeu_palha"],
    "itemEquipado": null
  },
  "ultimaNotificacao": "2026-04-29" // Para evitar flood de alertas no mesmo dia
}
```

## Entidade: `Task` (Sem alteração estrutural)

As tarefas continuam com sua estrutura original. O cálculo de XP será derivado do evento de "conclusão":

- Quando `status` passa para `'concluida'`, disparar `addXP(10)`.

## Lógica de Estado (XP e Evolução)

```javascript
const PET_STAGES = [
  { level: 0, name: "Ovo", requiredXP: 0, image: "ovo.png" },
  { level: 1, name: "Bebê", requiredXP: 100, image: "bebe.png" },
  { level: 2, name: "Jovem", requiredXP: 300, image: "jovem.png" },
  { level: 3, name: "Adulto", requiredXP: 600, image: "adulto.png" }
];
```
