"use client";

import { signUpServizioAccogliente } from "@/app/api/auth/_controllers";
import { FormControl, FormMessage } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormField, FormItem } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ServizioAccoglienteSchema } from "@/schemas/servizio-accogliente";
import AppForm from "@/components/form/AppForm";
import Loader from "@/components/Loader";

// import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [placeId, setPlaceId] = useState("");

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API key
  //   libraries,
  // });

  // const handlePlaceChanged = () => {
  //   if (autocompleteRef.current) {
  //     const place = autocompleteRef.current.getPlace();
  //     if (place) {
  //       setAddress(place.formatted_address || "");
  //       setPlaceId(place.place_id || "");
  //     }
  //   }
  // };

  // const autocompleteRef = useRef(null);

  const servizioAccoglienteForm = useForm<
    z.infer<typeof ServizioAccoglienteSchema>
  >({
    resolver: zodResolver(ServizioAccoglienteSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      serviceRole: "",
      structureName: "",
      enteGestore: "",
      structureType: "", // TODO: cambiare in un array
      accredittedInRome: false,
      emergencyReception: false,
      availableToWelcome: false,
      address: "",
      comune: "",
      province: "",
      adminName: "",
      adminSurname: "",
      website: undefined,
      servicesCardLink: undefined,
      otherInfo: undefined,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ServizioAccoglienteSchema>
  ) => {
    setLoading(true);
    const response = await signUpServizioAccogliente(values);

    setLoading(false);

    if (!response.error) {
      redirect("/registrazione/successo");
    } else {
      return toast({
        title: "Errore",
        description: "Oops! Qualcosa è andato storto. Riprova.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8">
      <div className="heading mb-8">Registrazione Servizio Accogliente</div>
      <Form {...servizioAccoglienteForm}>
        <form onSubmit={servizioAccoglienteForm.handleSubmit(onSubmit)}>
          <AppForm
            leftColumn={
              <>
                <div className="text-xl">Utente</div>
                <div className="subheading">
                  Inserisci i dati relativi all&apos;amministratore della
                  struttura
                </div>
              </>
            }
            rightColumn={
              <div className="space-y-4">
                <FormField
                  control={servizioAccoglienteForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Inserisci il nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={servizioAccoglienteForm.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cognome</FormLabel>
                      <FormControl>
                        <Input placeholder="Inserisci il cognome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={servizioAccoglienteForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Inserisci la email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={servizioAccoglienteForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefono</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Inserisci il numero di telefono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={servizioAccoglienteForm.control}
                  name="serviceRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mansione</FormLabel>
                      <FormControl>
                        <Input placeholder="Inserisci la mansione" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            }
          />
          <hr className="my-10" />
          <AppForm
            leftColumn={
              <>
                <div className="text-xl">Struttura</div>
                <div className="subheading">
                  Inserisci i dati relativi ad una struttura da te gestita. In
                  seguito avrai la possibilità di aggiungerne altre.
                </div>
              </>
            }
            rightColumn={
              <>
                <div className="space-y-4">
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="structureName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome struttura</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Inserisci il nome della struttura"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="enteGestore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ente gestore</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Inserisci l'ente gestore"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* // TODO: deve diventare una multiselect */}
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="structureType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo di struttura</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Inserisci il tipo di struttura"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="accredittedInRome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          La struttura è accreditata presso il comune di Roma?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                          >
                            <FormItem>
                              <FormControl>
                                <RadioGroup className="mt-2" defaultValue="">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="true"
                                      id="accredittedInRome"
                                    />
                                    <Label
                                      htmlFor="accredittedInRome"
                                      className="cursor-pointer font-normal"
                                    >
                                      Si
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="false"
                                      id="notAccredittedInRome"
                                    />
                                    <Label
                                      htmlFor="notAccredittedInRome"
                                      className="cursor-pointer font-normal"
                                    >
                                      No
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="emergencyReception"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          La struttura accoglie in emergenza?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                          >
                            <FormItem>
                              <FormControl>
                                <RadioGroup className="mt-2" defaultValue="">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="true"
                                      id="emergencyReception"
                                    />
                                    <Label
                                      htmlFor="emergencyReception"
                                      className="cursor-pointer font-normal"
                                    >
                                      Si
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="false"
                                      id="notEmergencyReception"
                                    />
                                    <Label
                                      htmlFor="notEmergencyReception"
                                      className="cursor-pointer font-normal"
                                    >
                                      No
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="availableToWelcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          La struttura è disponibile ad accogliere?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                          >
                            <FormItem>
                              <FormControl>
                                <RadioGroup className="mt-2" defaultValue="">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="true"
                                      id="availableToWelcome"
                                    />
                                    <Label
                                      htmlFor="availableToWelcome"
                                      className="cursor-pointer font-normal"
                                    >
                                      Si
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="false"
                                      id="notAvailableToWelcome"
                                    />
                                    <Label
                                      htmlFor="notAvailableToWelcome"
                                      className="cursor-pointer font-normal"
                                    >
                                      No
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Indirizzo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Inserisci l'indirizzo"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="comune"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comune</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Inserisci comune" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Roma">Roma</SelectItem>
                              <SelectItem value="Ciampino">Ciampino</SelectItem>
                              <SelectItem value="Fiumicino">
                                Fiumicino
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provincia</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Inserisci provincia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="RM">RM</SelectItem>
                              <SelectItem value="LT">LT</SelectItem>
                              <SelectItem value="FR">FR</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="adminName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome amministratore</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Inserisci il nome dell'amministratore"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="adminSurname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cognome amministratore</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Inserisci il cognome dell'amministratore"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sito web</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Inserisci il sito web"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="servicesCardLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link carta dei servizi</FormLabel>
                        <FormControl>
                          <Input placeholder="Inserisci il link" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={servizioAccoglienteForm.control}
                    name="otherInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Altre informazioni</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Inserisci altre informazioni"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                  control={servizioAccoglienteForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Indirizzo</FormLabel>
                      <FormControl>
                        {isLoaded && (
                          <Autocomplete
                            onLoad={(
                              autocomplete: google.maps.places.Autocomplete
                            ) => (autocompleteRef.current = autocomplete)}
                            onPlaceChanged={handlePlaceChanged}
                          >
                            <Input
                              placeholder="Inserisci l'indirizzo"
                              {...field}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </Autocomplete>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                </div>
                <Button
                  className="w-full md:w-[200px] mt-6"
                  type="submit"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? <Loader /> : "Completa registrazione"}
                </Button>
              </>
            }
          />
        </form>
      </Form>
    </div>
  );
};

export default Page;
