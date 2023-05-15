import styled from "styled-components";

export const CardContainer = styled.div`
    width: 30%;
    height: 200px;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-template-rows: auto auto auto;
    grid-template-areas:"title title title . icon" "detail detail detail . icon" "status status status . ." ;
`
export const Title = styled.div`
    color: #8898aa;
    text-transform: uppercase;
    font-size: .8125rem;
    grid-area: title;
`
export const Details = styled.div`
    font-weight: 600;
    color:#32325d;
    font-size: 2rem;
    grid-area: detail;
    padding-left: 5px;
`
export const IconContainer = styled.div`
    background-color: #ccc;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    grid-area: icon;
    padding: 0.3rem;
    background-color: ${({ color }) => `${color}`};
    font-size:3.2rem;
    padding-left:0.7rem;
    color:white;
`
export const Status = styled.div`
    grid-area: status;
    color:#aaa;
`