import Lottie from "lottie-react";
import beer from "../../assets/beer.json";
import loading from "../../assets/loading.json";


const styleBeer = {
    height: 400,
};
const styleText = {
    height: 300,
};

const Loader = () => {
    return (
        <>
            <Lottie
                animationData={beer}
                style={styleBeer}
            />
            <Lottie
                animationData={loading}
                style={styleText}
            />
        </>
    );
};

export default Loader;