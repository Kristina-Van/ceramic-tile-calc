import {useState} from "react";

function App() {

    const [areaWidth, setAreaWidth] = useState(0);
    const [areaHeight, setAreaHeight] = useState(0);
    const [areaAddition, setAreaAddition] = useState(10);

    const [area, setArea] = useState(0);

    const [tilesWidth, setTilesWidth] = useState(0);
    const [tilesHeight, setTilesHeight] = useState(0);
    const [sellOption, setSellOption] = useState('');
    const [tilesInBox, setTilesInBox] = useState(0);
    const [boxQuantity, setBoxQuantity] = useState(0);
    const [tilesPrice, setTilesPrice] = useState(0);

    const [tilesAmount, setTilesAmount] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

    const calculate = (obj) => {
        const data = {
            areaWidth,
            areaHeight,
            areaAddition,
            tilesWidth,
            tilesHeight,
            sellOption,
            tilesInBox,
            tilesPrice
        }

        const merge = {...data, ...obj}

        const totalArea = Math.ceil(merge.areaWidth * merge.areaHeight * (1 + merge.areaAddition / 100));
        setArea(totalArea);

        const tilesArea = merge.tilesWidth * merge.tilesHeight;
        const tilesAmount = Math.ceil(totalArea / tilesArea);
        setTilesAmount(tilesAmount);

        let boxQuantity = 0;
        if (merge.sellOption === "box") {
            boxQuantity = Math.ceil(tilesAmount / merge.tilesInBox);
            setBoxQuantity(boxQuantity);
        }

        if (merge.sellOption === "piece") {
            setBoxQuantity(0);
        }

        const totalPrice = merge.sellOption === "box" ? merge.tilesPrice * boxQuantity : merge.tilesPrice * tilesAmount;
        setTotalPrice(totalPrice);
    }


    const areaWidthChange = (e) => {
        setAreaWidth(e.target.value);
        calculate({areaWidth: +e.target.value});
    }

    const areaHeightChange = (e) => {
        setAreaHeight(e.target.value);
        calculate({areaHeight: +e.target.value});
    }

    const areaAdditionChange = (e) => {
        setAreaAddition(e.target.value);
        calculate({areaAddition: +e.target.value});
    }

    const tilesWidthChange = (e) => {
        setTilesWidth(e.target.target);
        calculate({tilesWidth: +e.target.value});
    }

    const tileHeightChange = (e) => {
        setTilesHeight(e.target.value);
        calculate({tilesHeight: +e.target.value});
    }

    const sellOptionChange = (e) => {
        setSellOption(e.target.value);
        calculate({sellOption: e.target.value});
    }

    const tilesInBoxChange = (e) => {
        setTilesInBox(e.target.value);
        calculate({tilesInBox: +e.target.value});
    }

    const tilesPriceChange = (e) => {
        setTilesPrice(e.target.value);
        calculate({tilesPrice: +e.target.value});
    }


    return (
        <div className="container">
            <h1 className="text-center">Tile calculator</h1>
            <div className="row">
                <div className="col-md-4">
                    <label>Area Width, ft</label>
                    <input type="number" className="form-control" value={areaWidth}
                           onChange={areaWidthChange}/>
                </div>

                <div className="col-md-4">
                    <label>Area Height, ft</label>
                    <input type="number" className="form-control" value={areaHeight}
                           onChange={areaHeightChange}/>
                </div>

                <div className="col-md-4">
                    <label>Area Additional %</label>
                    <input type="number" className="form-control" value={areaAddition}
                           onChange={areaAdditionChange}/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <label>Tile Width, in</label>
                    <input type="number" className="form-control" value={tilesWidth}
                           onChange={tilesWidthChange}/>
                </div>
                <div className="col-md-4">
                    <label>Tile Height, in</label>
                    <input type="number" className="form-control" value={tilesHeight}
                           onChange={tileHeightChange}/>
                </div>
                <div className="col-md-4">
                    <label>Sell Option</label>
                    <select className="form-select" aria-label="Sell Option" onChange={sellOptionChange}>
                        <option value="">Select</option>
                        <option value="box">Box</option>
                        <option value="piece">Piece</option>
                    </select>
                </div>
            </div>

            {sellOption === "box" && (
                <div>
                    <label>Tiles in Box</label>
                    <input type="number" className="form-control" placeholder="Box Quantity" value={tilesInBox}
                           onChange={tilesInBoxChange}/>
                </div>
            )}
            Price per {sellOption}:
            <input type="number" className="form-control" placeholder="Price" value={tilesPrice}
                   onChange={e => tilesPriceChange(e)}/>

            <div className="mt-5">
                <div> Area: {area} sq in</div>
                <div> Tiles Amount: {tilesAmount}</div>

                {sellOption === "box" && <div>Box Quantity: {boxQuantity}</div>}
                <div>Total Price: ${totalPrice}</div>
            </div>


        </div>
    );
}

export default App;
