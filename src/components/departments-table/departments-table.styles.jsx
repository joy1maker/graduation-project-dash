import styled from 'styled-components';

export const Table = styled.table`
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  td,th{
        border: 1px solid #ddd;
       padding: 8px;
    }
    tr:nth-child(even){
        background-color: #f2f2f2;;
    }
    tr:hover{
        background-color: #ddd;
         
    }
    th{
        padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
    }
    span{
    font-size: 20px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  gap:20px;
`
export const TableAttatchments = styled.div`
display: flex;
flex-direction: column;
gap:5px;
`

export const MyButton = styled.button`
  background-color: #fff;
  color: #333;
  border: 1px solid #333;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover{
    background-color: #333;
    color: #fff;
  }
  &:disabled{
    opacity: 0.5;
  cursor: not-allowed;
  }
`
export const Select = styled.select`
  
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 10px;
  background-color: #f8f8f8;
  border: none;
  border-radius: 5px;
  border-bottom: 2px solid #ddd;
  font-family: Arial, sans-serif;
  font-size: 16px;
  background-image: url('path/to/arrow-icon.svg');
  background-repeat: no-repeat;
  background-position: right center;
  &:hover, &:focus {
    outline: none;
    border-bottom-color: #aaa;
  }
  &:disabled {
    opacity: 0.5;
  }
   option {
  padding: 10px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  border: none;
  &:hover{
    background-color: #f2f2f2;
  }
  &:checked{
    background-color: #aaa;
  color: #fff;
  }
}
`