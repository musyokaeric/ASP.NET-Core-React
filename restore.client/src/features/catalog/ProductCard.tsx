import { Avatar, Button, Card, CardActions, CardContent, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        //<ListItem key={product.id}>
        //    <ListItemAvatar>
        //        <Avatar src={product.imageUrl} />
        //    </ListItemAvatar>
        //    <ListItemText>{product.name} - {product.price}</ListItemText>
        //</ListItem>

        <Card>
            <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/id/20/367/267"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}