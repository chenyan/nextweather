import CityData from "@/interfaces/city";
import WeatherData from "@/interfaces/weather";
import cities from "@/lib/city.list.json";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

let Cities = cities as CityData[];

type Props = {
    city: CityData;
    weather: WeatherData;
};

async function getProps(city_id: string) {
    const city = Cities.find((city) => city.id === parseInt(city_id as string));

    if (!city) {
        throw new Error('City not found');
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.WEATHER_API_KEY}&exclude=minutely&units=metric`;

    const res = await fetch(url);
    const weather:WeatherData = await res.json();
    
    if (!weather) {
        throw new Error('WeatherData not found');
    }

    return {
        city,
        weather,
    };
}

export default async function Page({ params }: { params: {city_id: string}}) {
    const { city, weather } = await getProps(params.city_id as string);
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    return (
        <>
            <Head>
                <title>Weather Wise</title>
            </Head>
            <main className="mt-5 mx-5">
                <h1 className="text-xl font-medium mb-4">Weather Wise</h1>
                <Link href="/" className="text-sm">
                    &larr; Home
                </Link>
                <div className="py-5">
                    <div className="bg-blue-500 rounded p-4">
                        <div className="grid grid-cols-2">
                            <div>
                                <h2 className="text-2xl mb-4 text-white">{city.name} ({city.country})</h2>
                                <span className="font-medium text-lg text-white">
                                    {weather.main.temp_max.toFixed(0)}&deg;C 
                                </span>
                                &nbsp;
                                <span className=" text-gray-300 text-sm">
                                    ({weather.main.temp_min.toFixed(0)}&deg;C)
                                </span>
                            </div>
                            <div className=" justify-self-end">
                                <Image src={iconUrl} width={50} height={50} alt={"weather icon"}/>
                                <div className=" text-white text-sm">{weather.weather[0].description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}