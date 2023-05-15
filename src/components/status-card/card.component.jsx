import { CardContainer, Title, Details, IconContainer, Status } from "./card.styles"
const StausCard = ({ card }) => {
    const { iconColor, succsuesStaus, title, detail, status, iconName } = card;
    const arrow = succsuesStaus ? "arrow-up" : "arrow-down";
    const arrowColor = succsuesStaus ? "green" : "red";
    const statusStyle = {
        color: arrowColor,
        marginRight: "10px"
    };
    return (
        <CardContainer>
            <Title>{title}</Title>
            <IconContainer color={iconColor}><i className={`fa fa-${iconName}`} aria-hidden="true"></i></IconContainer>
            <Details>{detail}</Details>
            <Status><span style={statusStyle}><i className={`fa fa-${arrow}`}></i> {status}</span> from last month</Status>
        </CardContainer>
    )
}
export default StausCard;