import CityData from '@/interfaces/city';
import cities from '@/lib/city.list.json';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const Cities = cities as CityData[];
const NUM_SUGGESTIONS = 5;

// searchCities() takes a prefix string and returns an array of CityData objects
function searchCities(prefix: string): CityData[] {
    const matched = Cities.filter(city => city.name.toLowerCase().startsWith(prefix.toLowerCase())).slice(0, NUM_SUGGESTIONS);
    return matched;
}

export function GET(req: NextRequest, { params }: { params: {name: string}}) {
    let name = params.name;
    const cityName = Array.isArray(name)? name.join(''): name;
    const matched = cityName? searchCities(cityName): [];
    return NextResponse.json({cities: matched});
}
