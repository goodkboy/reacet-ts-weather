import Search from "./components/Search/Search";
import {useForecast} from "./hooks/useForecast";
import Forecast from "./components/Forecast/Forecast";
import Loading from "./components/Icons/Loading";

const App = (): JSX.Element => {

    const {
        term,
        options,
        forecast,
        onInputChange,
        onOptionSelect,
        onSubmit,
        loading
    } = useForecast();

    return (
        <main className="flex justify-center items-center bg-gradient-to-br from-sky-900 via-teal-900 to-current h-[100vh] w-full">
            {loading
                ? <Loading />
                : forecast ? (
                        <Forecast forecast={forecast}/>
                    ) : (
                        <Search
                            term={term}
                            onInputChange={onInputChange}
                            options={options}
                            onOptionSelect={onOptionSelect}
                            onSubmit={onSubmit}
                        />
                    )}
        </main>
    )
}

export default App
