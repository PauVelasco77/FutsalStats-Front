import faker from "@faker-js/faker";
import ObjectID from "bson-objectid";
import { Factory } from "fishery";
import { Player } from "../Interfaces/PlayerInterface";

const positions = ["alero", "portero", "cierre", "pivote", ""];

const playerFactory = Factory.define<Player>(() => ({
  name: faker.name.findName(),
  number: faker.datatype.number({ min: 1, max: 99 }),
  goals: faker.datatype.number({ min: 1, max: 200 }),
  assists: faker.datatype.number({ min: 1, max: 100 }),
  yellowCards: faker.datatype.number({ min: 1, max: 20 }),
  redCards: faker.datatype.number({ min: 1, max: 20 }),
  totalMatches: faker.datatype.number({ min: 1, max: 50 }),
  position: positions[Math.floor(Math.random() * positions.length)],
  photo: faker.image.imageUrl(),
  id: ObjectID().toHexString(),
}));

export const generateRandomPlayer = (): Player => playerFactory.build();
export const generateRandomPlayers = (total: number): Player[] =>
  playerFactory.buildList(total);
