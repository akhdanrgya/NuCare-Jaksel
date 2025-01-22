import React from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";


const Dashboard = () => {
    return (
        <>
            <DataStatsOne/>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
                {/*<ChartOne/>*/}
                {/*<ChartTwo/>*/}
            </div>
        </>
    )
}

export default Dashboard