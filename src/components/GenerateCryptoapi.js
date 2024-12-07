import axios from "axios";
import { useEffect, useState } from "react";
import { CRYTO_KEY } from "./StoreKey"; // Ensure you have this defined appropriately

function GenerateCrytoapi() {
    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State to store the search term (coin name)
    const [limit, setLimit] = useState(10); // State for limiting the number of coins displayed
    const [currency, setCurrency] = useState("USD"); // State for selecting currency

    const [error, setError] = useState(null);

    // Fetching crypto data from the API
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get(`https://openapiv1.coinstats.app/coins`, {
                    headers: {
                        'X-API-KEY': CRYTO_KEY, // Replace with your actual API key
                        'accept': 'application/json',
                    },
                    params: {
                        limit: limit, // Apply the limit query param
                        currency: currency, // Apply the currency query param
                        name: searchTerm // Include search term for filtering
                    }
                });

                // response.data.coins : accesses the coins array from the API response (response.data). It contains the list of all coins fetched from the API
                // The subtraction (a.rank - b.rank) determines the order:
                // If a.rank is less than b.rank (i.e., a.rank - b.rank is negative), a is placed before b.
                // If a.rank is greater than b.rank (i.e., a.rank - b.rank is positive), b is placed before a.
                // If a.rank equals b.rank (i.e., a.rank - b.rank is 0), their order remains unchanged.
                const topCoins = response.data.result.sort((a, b) => a.rank - b.rank);
                setCoins(topCoins);
            } catch (err) {
                setError("Failed to Get Coin data");
            }
        };

        fetchCoins();
    }, [limit, currency, searchTerm]); // Re-fetch data when limit, currency, or search term changes

    if (error) return <div>{error}</div>;

    return (
        <div>
            <div>
                <h1>All Cryptocurrencies</h1>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Coin Name" 
                />

                <div className="select-style">
                    <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                        <option value={10}>Top 10</option>
                        <option value={50}>Top 50</option>
                        <option value={100}>Top 100</option>
                    </select>

                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                    </select>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Market Cap ({currency})</th>
                        <th>Price ({currency})</th>
                        <th>Available Supply</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin) => (
                        <tr key={coin.id}>
                            <td className="rank">{coin.rank}</td>
                            <td className="logo">
                                <img src={coin.icon} alt={coin.name} style={{ width: "30px", marginRight: "10px" }} />
                                {coin.name}
                            </td>
                            <td className="symbol">{coin.symbol}</td>
                            <td>{coin.marketCap.toLocaleString()}</td>
                            <td>{coin.price}</td>
                            <td>{coin.availableSupply.toLocaleString()}</td>
                            <td>{coin.volume.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GenerateCrytoapi;
