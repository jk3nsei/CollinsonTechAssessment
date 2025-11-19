import React from "react";

interface ICarPooling {
  seats: number[];
  people: number[];
}

const INSUFFICNET_AMOUNT_OF_CARS =
  "There are not enough cars for the amount of people provided";

const CarPooling: React.FC<ICarPooling> = ({ seats, people }) => {
  /**
   * calculate the amount of cars and the amount of people there are
   */

  const amountOfSeats: number = seats.reduce(
    (a: number, b: number) => a + b,
    0
  );
  const amountOfPeople: number = people.reduce(
    (a: number, b: number) => a + b,
    0
  );

  /**
   * stop if there are less cars than there are people
   */

  if (amountOfSeats < amountOfPeople) return INSUFFICNET_AMOUNT_OF_CARS;

  /**
   * sort the amount of available seats in descending order
   * to be able to use the least amount of cars
   */

  const amountOfSeatsDesc: number[] = seats.slice().sort((a, b) => b - a);

  let accumulator: number = 0;
  let numberOfCars: number = -1;

  /**
   * Loop through seat counts sorted largest first and add them to `accumulator`.
   * We pick big cars first so we use as few cars as possible.
   * When the running total reaches or exceeds `amountOfPeople`,
   * set `numberOfCars` to the count used (index + 1) and skip further work.
   */

  amountOfSeatsDesc.forEach((seat: number, index: number) => {
    if (numberOfCars !== -1) return;
    accumulator += seat;
    if (accumulator >= amountOfPeople) {
      numberOfCars = index + 1;
    }
  });
  return <span>The minimum amount of cars needed are {numberOfCars}</span>;
};

export default CarPooling;
