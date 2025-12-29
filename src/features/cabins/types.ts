import type { ArrayElement, PaginationAndSort } from '@/lib/types';
import type { getCabins } from '@/services/supabase/queries/cabins';
import type { Database, TablesUpdate } from '@/services/supabase/supabase.auto.types';

export type CabinsAutoRow = Database['public']['Tables']['cabins']['Row'];
export type Cabins = Awaited<ReturnType<typeof getCabins>>['data'];
export type Cabin = ArrayElement<Cabins>;
export type CabinsSearchParams = PaginationAndSort<Cabin>;
export type CabinsUpdate = TablesUpdate<'cabins'>;
