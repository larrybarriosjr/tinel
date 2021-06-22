import styles from "./CartItem.module.scss"

type CartItemProps = {
  title: string
  imageUrl: string
}

const CartItem = ({ title, imageUrl }: CartItemProps) => {
  return (
    <div className={styles.box}>
      <span className={styles.image_container}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </span>
    </div>
  )
}

export default CartItem
