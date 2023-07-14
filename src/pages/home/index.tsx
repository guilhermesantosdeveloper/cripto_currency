/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import styles from './home.module.css'
import {BiSearch} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'

// https://coinlib.io/api/v1/coinlist?key=049b978a777a4ee7&pref=BTC&page=1&order=volume_desc

interface CoinProps {
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formatedPrice: string;
    formatedMarket: string;
    numberDelta?: number
}

interface DataProps{
    coins: CoinProps[];
}

export function Home(){
    const [coins, setCoins] = useState<CoinProps[]>([])

    const [inputValue, setInputValue] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        function getData() {
            

            fetch('https://sujeitoprogramador.com/api-cripto/?key=049b978a777a4ee7&pref=BRL').then((res)=>{
                res.json().then((data:DataProps)=>{
                   
                    const coinsData:CoinProps[] = data.coins.slice(0,15)


                    const price = Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
                    const formartResult = coinsData.map((item)=>{
                        const formated = {
                            ...item,
                            formatedPrice: price.format(Number(item.price)),
                            formatedMarket: price.format(Number(item.market_cap)),
                            numberDelta: parseFloat(item.delta_24h.replace(',', '.'))
                        }

                        return formated
                    })

                    setCoins(formartResult)
                }).catch((erro)=>{
                    console.log(erro);
                })
            })


            
            
           
            
        }

        getData();
    }, [])

    function handleSearch(e: FormEvent){
        e.preventDefault();
        if(inputValue === ""){
            return
        }
        navigate(`/detail/${inputValue}`)
    }

    return(
        <main className={styles.conteiner}>
            <form className={styles.form} onSubmit={handleSearch}>
                <input 
                type="text"
                placeholder='Digite o simbolo da moeba: BTC'
                value={inputValue}
                onChange={(e)=> setInputValue(e.target.value)} />

                <button type='submit'>
                    <BiSearch size={30} color="#fff"/>
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor Mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                    {coins.map(coin=>(
                        <tr className={styles.tr} key={coin.name}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <Link to={`/detail/${coin.symbol}`} className={styles.link}><span >{coin.name}</span> | {coin.symbol}</Link>
                            
                        </td>
                        <td className={styles.tdLabel} data-label="Mercado">
                            {coin.formatedMarket}
                        </td>
                        <td className={styles.tdLabel} data-label="Preço">
                            {coin.formatedPrice}
                        </td>
                        <td className={coin.numberDelta && coin.numberDelta >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                            <span>{coin.delta_24h}</span>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}