const pool = require('./db');
async function getOrders() {
    try {
      const [rows] = await pool.execute(`SELECT * FROM purchase_orders`);
      return rows;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
// Fonction pour créer une commande
async function addOrder(order_date, customer_id, delivery_address, track_number, status) {
    try {
      // Vérifier si les paramètres sont définis
      if (!order_date || !customer_id || !delivery_address || !track_number || !status) {
        throw new Error('Missing required parameters');
      }
  
      const [result] = await pool.execute(
        `INSERT INTO purchase_orders (order_date, customer_id, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)`,
        [order_date, customer_id, delivery_address, track_number, status]
      );
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
  // Fonction pour mettre à jour une commande
async function updateOrder(id, order_date, customer_id, delivery_address, track_number, status) {
    try {
      // Vérifier si les paramètres sont définis
      if (!id || !order_date || !customer_id || !delivery_address || !track_number || !status) {
        throw new Error('Missing required parameters');
      }
  
      const [result] = await pool.execute(
        `UPDATE purchase_orders
         SET order_date = ?, customer_id = ?, delivery_address = ?, track_number = ?, status = ?
         WHERE id = ?`,
        [order_date, customer_id, delivery_address, track_number, status, id]
      );
  
      return result;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }
  // Fonction pour supprimer une commande
async function destroyOrder(id) {
    try {
      // Vérification du paramètre
      if (!id) {
        throw new Error('Order ID is required');
      }
  
      const [result] = await pool.execute(
        `DELETE FROM purchase_orders WHERE id = ?`,
        [id]
      );
  
      return result;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
  
  
  
// Fonction pour ajouter un détail de commande
async function addOrderDetail(order_id, product_id, quantity, price) {
    try {
        if (!order_id || !product_id || !quantity || !price) {
            throw new Error('Missing required parameters');
        }

        await pool.execute(
            `INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
            [order_id, product_id, quantity, price]
        );
        console.log('Order detail added successfully.');
    } catch (error) {
        console.error('Error adding order detail:', error);
        throw error;
    }
}

// Fonction pour obtenir les détails d'une commande
async function getOrderDetails(id) {
    try {
        const [rows] = await pool.execute(
            `SELECT * FROM order_details WHERE id = ?`, [id]
        );
        return rows;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
}

// Fonction pour supprimer un détail de commande
async function deleteOrderDetail(id) {
    try {
        await pool.execute(`DELETE FROM order_details WHERE id = ?`, [id]);
        console.log('Order detail deleted successfully.');
    } catch (error) {
        console.error('Error deleting order detail:', error);
        throw error;
    }
}



  

module.exports = { getOrders, addOrder, updateOrder,   destroyOrder, addOrderDetail, getOrderDetails, deleteOrderDetail };
