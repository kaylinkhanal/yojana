'use client'

import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const CardView =()=> {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>hello</b>
            <p className="text-default-500">211</p>
          </CardFooter>
        </Card>
    </div>
  );
}



export default CardView