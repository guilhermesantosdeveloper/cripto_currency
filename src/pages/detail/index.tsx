import styles from './detail.module.css'
import { useParams,useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';


interface CoinProp{
    symbol: string,
    name: string,
    price: string,
    market_cap: string,
    low_24h: string,
    high_24h: string,
    total_volume_24: string,
    delta_24h: string,
    formatedPrice: string,
    formatedMarket: string,
    formatedLowPrice: string,
    formatedHighPrice: string,
    numberDelta: number,
    error?: string,
    
}


export function Detail(){
    const {cripto} = useParams();
    const [detail, setDetail]= useState<CoinProp>()
    const [loading, setLoading]= useState(true);
    const navigate = useNavigate()


    useEffect (()=>{
        function getData(){
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=049b978a777a4ee7&symbol=${cripto}&pref=BRL`)
            .then((res)=>{
                res.json()
                .then((data: CoinProp)=>{
                    if (data.error){
                        navigate('/')
                    }

                    const price = Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })

                    const resultaData = {
                        ...data,
                        formatedPrice : price.format(Number(data.price)),
                        formatedMarket :price.format(Number(data.market_cap)),
                        formatedLowPrice :price.format(Number(data.low_24h)),
                        formatedHighPrice :price.format(Number(data.high_24h)),
                        numberDelta: parseFloat(data.delta_24h.replace(',', '.'))

                    }

                    setDetail(resultaData)
                    setLoading(false);




                }).catch((err)=>{
                    navigate('/');
                })
            }).catch((err)=>{
                navigate('/');
            })
        }

        getData();
    }, [cripto])

    if (loading){
        return(
            <div className={styles.container}>
                <h4 className={styles.center}>Carregando informações...</h4>
            </div>
        )
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.center}>{detail?.name}</h1>

            <section className={styles.content}>
                <p>
                    <strong>Preço:</strong> {detail?.formatedPrice}
                </p>
                <p>
                    <strong>Máxia 24h:</strong> {detail?.formatedHighPrice}
                </p>
                <p>
                    <strong>Mínima 24h:</strong> {detail?.formatedLowPrice}
                </p>
                <p>
                    <strong>Delta 24h:</strong> <span className={detail?.numberDelta && detail?.numberDelta >= 0 ? styles.profit : styles.loss}>{detail?.delta_24h}</span>
                </p>
                <p>
                    <strong>Valor Mercado:</strong> {detail?.formatedMarket}
                </p>

            </section>


        </div>
    )
}