import { supabase } from ".";

export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    // Return an appropriate value in case of an error, like an empty array.
    return [];
  }
};

export const getNextOrders = async (
  from: number,
  to: number,
): Promise<{ data: Order[] }> => {
  let ordersQuery = supabase
    .from("orders")
    .select("*")
    .limit(5)
    .order("created_at", { ascending: false });

  if (from !== undefined && to !== undefined) {
    ordersQuery = ordersQuery
      .limit(5)
      .order("created_at", { ascending: false })
      .range(from, to);
  }

  const { data, error } = await ordersQuery;

  if (error) {
    console.error("Error fetching orders:", error);
    return { data: [] }; // Return an empty array or handle the error as needed.
  }

  return { data };
};

export const getOrdersByCargo = async (
  cargo: string,
  from: number,
  to: number,
): Promise<{ data: Order[] }> => {
  let ordersQuery = supabase
    .from("orders")
    .select("*")
    .limit(5)
    .eq("cargo", cargo)
    .order("created_at", { ascending: false });

  if (from !== undefined && to !== undefined) {
    ordersQuery = ordersQuery.range(from, to);
  }

  const { data, error } = await ordersQuery;

  if (error) {
    console.error("Error fetching orders:", error);
    return { data: [] }; // Return an empty array or handle the error as needed.
  }

  return { data };
};

export const getUserOrders = async (userId: number): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("userId", userId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    // Return an appropriate value in case of an error, like an empty array.
    return [];
  }
};
