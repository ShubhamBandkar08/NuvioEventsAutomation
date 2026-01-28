import { businessUnitData } from "./businessUnit.data";
import { productData } from "./product.data";

export const schedularData = {

    SchedulerBu: businessUnitData.name,
    ScheduleProduct: productData.productName,
    ScheduleSalesChannel: productData.ProductSalesChannel,

    DayByWeeks: ["Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        //   "Friday", 
        //  "Saturday",
        "Sunday"
    ],
    StartDay: "1",
    EndDay: "4",
    MonthYear: "April 2026"
}