import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ServizioAccoglienteSchema } from "@/schemas/servizio-accogliente";
import { generatePassword, generateUsername } from "@/lib/server-polyfills";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const schema = ServizioAccoglienteSchema.parse(body);
    const username = generateUsername(schema.email);
    const password = generatePassword();

    // check if user with this email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: schema.email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          error: "Esiste già un utente associato a questo indirizzo email",
        },
        { status: 409 }
      );
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name: schema.name,
        surname: schema.surname,
        email: schema.email,
        phone: schema.phone,
        mansione: schema.serviceRole,
        username,
        password: hashedPassword,
        role: "Servizio Accogliente",
      },
    });

    if (!newUser) {
      return NextResponse.json(
        { user: null, error: "Errore nella creazione dell'utente" },
        { status: 500 }
      );
    }

    // create new structure
    const newStructure = await db.structure.create({
      data: {
        name: schema.structureName,
        enteGestore: schema.enteGestore,
        type: schema.structureType.split(","),
        accredittedInRome: schema.accredittedInRome,
        emergencyReception: schema.emergencyReception,
        availableToWelcome: schema.availableToWelcome,
        address: schema.address,
        city: "Roma",
        comune: schema.comune,
        province: schema.province,
        municipio: "Roma",
        zipCode: "00100",
        latitude: 41.9033,
        longitude: 12.4534,
        adminName: schema.adminName,
        adminSurname: schema.adminSurname,
        website: schema.website,
        servicesCardLink: schema.servicesCardLink,
        otherInfo: schema.otherInfo,
        isActive: true,
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
    });

    if (!newStructure) {
      return NextResponse.json(
        { structure: null, error: "Errore nella creazione della struttura" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Registrazione avvenuta con successo",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
