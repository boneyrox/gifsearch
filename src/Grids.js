import React, { useEffect, memo } from 'react'

const Grids = ({ gifs }) => {
    // extract the gifs from the response
    useEffect(() => {
        console.log(gifs);
    }, []);
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {
                gifs?.map((gif, index) => {
                    return (
                        <div
                            className="max-w-sm rounded  shadow-lg cursor-pointer
                            :hover {
                                transform: scale(1.1);
                                transition: transform 0.2s ease-in-out;
                                }"
                            key={gif.id + index}



                        >
                            <img className="w-full" src={gif.images.downsized.url} alt="Sunset in the mountains" />

                        </div>

                    )
                }
                )
            }
        </div>

    )
}


export default Grids