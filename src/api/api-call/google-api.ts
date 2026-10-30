import { AddressComponent } from "@/types/google";
import axios from "axios";

export const googleAPI = {
  getPlaces: async (text: string) => {
    const res = await axios.get("/api-v1/google", {
      params: { type: "places", query: text },
    });
    return res.data;
  },

  getCoodinatesAddress: async (lat: number, lng: number) => {
    const res = await axios.get("/api-v1/google", {
      params: { type: "geocode", lat, lng },
    });
    const address = res.data?.results?.[0];
    let transformedAddress: any = {};
    res.data?.results?.[0].address_components.forEach((element: any) => {
      element.types.forEach((type: any) => {
        transformedAddress[type] = element;
      });
    });

    return { ...address, transformedAddress };
  },

  getPlaceDetails: async (placeId: string) => {
    const res = await axios.get("/api-v1/google", {
      params: { type: "details", placeId },
    });
    let transformedAddress: { [key: string]: AddressComponent } = {};
    res.data?.result.address_components?.forEach(
      (element: AddressComponent) => {
        element.types.forEach((type: string) => {
          transformedAddress[type] = element;
        });
      }
    );
    return { ...res.data.result, transformedAddress };
  },
};
