import {ChangeEvent, useEffect, useState} from "react";
import {forecastType, optionType} from "../types";

const KEY = 'e6d137b6c8cf79f0d362cd527a1836f9'

export const useForecast = () => {
    const [term, setTerm] = useState<string>('');
    const [options, setOptions] = useState<[]>([]);
    const [city, setCity] = useState<optionType | null>(null);
    const [forecast, setForecast] = useState<forecastType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getSearchOptions = async (value: string) => {
        await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${KEY}`)
            .then(res => res.json())
            .then(data => setOptions(data))
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTerm(value);

        if (value === '') return

        getSearchOptions(value);
    }

    const getForecast = async (city: optionType) => {
        try {
            setLoading(true);

            await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${KEY}`)
                .then(res => res.json())
                .then(data => {
                    const forecastData = {
                        ...data.city,
                        list: data.list.slice(0, 16)
                    }

                    setForecast(forecastData);
                })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = () => {
        if (!city) return

        setTerm('');
        getForecast(city)
    }

    const onOptionSelect = (option: optionType) => {
        setCity(option)
    }

    useEffect(() => {
        if (city) {
            setTerm(city.name);
            setOptions([])
        }
    }, [city]);

    return {
        term,
        options,
        forecast,
        onInputChange,
        onOptionSelect,
        onSubmit,
        loading
    }
}