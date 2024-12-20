import { fireEvent, render,screen } from "@testing-library/react";
import ProductCalculator from "./Product";



describe(" Product Calculator",()=>{

    test("Should render component without Crashing",()=>{
        const {container}=render(<ProductCalculator/>)

       expect(container.querySelectorAll("input").length).toBe(3)
    });

    test("Should Display valid message for the input",()=>{

    const {container}=render(<ProductCalculator/>)

    let pnameEle=container.querySelector<HTMLInputElement>("#pname")
    let priceEle=container.querySelector("#price")
    let quantEle=container.querySelector("#quantity")
    let linkEle=container.querySelector('#link')

    fireEvent.change(pnameEle!,{target:{value:"123"}})
    fireEvent.change(priceEle!,{target:{value:100}})
    fireEvent.change(quantEle!,{target:{value:9}})
    fireEvent.click(linkEle!);
    expect(screen.getByText(/Total Amount for/)).toBeInTheDocument();
});

})

// export {};