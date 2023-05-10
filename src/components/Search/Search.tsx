import {ChangeEvent} from "react";
import {optionType} from "../../types";

type Props = {
    term: string,
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    options: [],
    onOptionSelect: (option: optionType) => void,
    onSubmit: () => void
}

const Search = ({
                    term,
                    onInputChange,
                    options,
                    onOptionSelect,
                    onSubmit
                }: Props): JSX.Element => {

    return (
        <main className="flex justify-center items-center h-[100vh] w-full">
            <section
                className='w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700 text-white'>
                <h1 className='text-4xl font-thin'>
                    Weather <span className='font-black'>Forecast</span>
                </h1>

                <p className='text-sm mt-2'>
                    Enter below a place you want to know
                    the weather of and select an option
                    from the dropdown
                </p>

                <div className='relative flex mt-10 md:mt-4'>
                    <input
                        type='text'
                        value={term}
                        className='focus:outline-none px-2 py-1 rounded-l-md border-2 border-white text-black'
                        onChange={onInputChange}
                        required
                    />

                    <ul className='absolute bg-white top-9 ml-1 rounded-b-md'>
                        {options.map((option: optionType, index: number) => (
                            <li key={index}>
                                <button onClick={() => onOptionSelect(option)}
                                        className='text-black text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1'>
                                    {option.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={onSubmit}
                        className='rounded-r-md border-2 border-black hover:border-white bg-black hover:bg-transparent px-2 py-1 cursor-pointer'>
                        Search
                    </button>
                </div>
            </section>
        </main>
    )
}

export default Search
