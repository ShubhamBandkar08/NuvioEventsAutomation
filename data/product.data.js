import { businessUnitData } from "./businessUnit.data";
import { locationData } from "./location.data";
import { priceCardData } from "./priceCard.data";
import { addonsData } from "./addons.data";


export const productData = {
    productName: "DAUZ Platinum",
    productShortDescription: "Test product short description 2",
    productDescription: "Test product description 2 ",
    ProductBusinessUnit: businessUnitData.name,
    ProductLocation: locationData.locationName,
    ProductPriceCard: priceCardData.priceCardName,
    ProductStatus: "Published",
    ProductAddons: addonsData.addonName,
    SalesChannelPriceCard: priceCardData.priceCardName,
    ProductSalesChannel: "Web"


};

