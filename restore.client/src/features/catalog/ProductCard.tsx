import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <ListItem key={product.id}>
            <ListItemAvatar>
                <Avatar src={product.imageUrl} />
            </ListItemAvatar>
            <ListItemText>{product.name} - {product.price}</ListItemText>
        </ListItem>
    )
}