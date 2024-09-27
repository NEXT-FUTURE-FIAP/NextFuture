import { MainPrix } from './stylePrix';
import Banner from '../PrixPredict/Banner'

export default function PrixPredict() {
    return (
        <>
            <Banner /> {/* Incluindo o Banner */}
            <MainPrix>
                <div className='prix_titulo'>
                    <h1 className='titulo'>Acerte seus palpites e ganhe prêmios!!</h1>
                </div>

                <section>
                    <p className='txt_prix'>
                        O Prixpredict é um game em que você pode apostar seus ePoints e multiplicá-los ao acertar seus palpites sobre as próximas corridas do Grande Prêmio da Fórmula E. 
                        Você pode apostar em temas variados, como pódio, ultrapassagens e até mesmo pit stop.
                    </p>
                </section>
            </MainPrix>
        </>
    );
}
