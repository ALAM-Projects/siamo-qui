import { z } from "zod";

export const ServizioAccoglienteSchema = z.object({
  name: z.string().min(1, "Inserisci il nome").max(100),
  surname: z.string().min(1, "Inserisci il cognome").max(100),
  email: z.string().min(1, "Inserisci la email").email("Invalid email"),
  phone: z.string().min(1, "Inserisci il numero di telefono").max(100),
  serviceRole: z.string().min(1, "Inserisci la tua mansione").max(100),
  structureName: z.string().min(1, "Inserisci il nome").max(100),
  enteGestore: z.string().min(1, "Inserisci l'ente gestore").max(100),
  // structureType: z
  //   .array(z.string())
  //   .min(1, "Inserisci almeno un tipo di struttura"),
  // TODO: deve diventare un array di stringhe
  structureType: z.string().min(1, "Inserisci il tipo di struttura").max(100),
  accredittedInRome: z.boolean(),
  emergencyReception: z.boolean(),
  availableToWelcome: z.boolean(),
  address: z.string().min(1, "Inserisci l'indirizzo").max(100),
  comune: z.string().min(1, "Inserisci il comune").max(100),
  province: z.string().min(1, "Inserisci la provincia").max(100),
  adminName: z
    .string()
    .min(1, "Inserisci il nome dell'amministratore")
    .max(100),
  adminSurname: z
    .string()
    .min(1, "Inserisci il cognome dell'amministratore")
    .max(100),
  website: z.string().url("Inserisci un URL valido").optional(),
  servicesCardLink: z.string().url("Inserisci un URL valido").optional(),
  otherInfo: z
    .string()
    .min(1, "Inserisci altre informazioni")
    .max(100)
    .optional(),
});
