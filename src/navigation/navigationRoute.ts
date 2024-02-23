import { RouteProp } from '@react-navigation/native';
import { ProductFilterArgs } from '@searchResult/service';
import { Post, Product, Seller, ShippingAddress, SizeGuide } from '@type/common';
import { ProdVariants } from '@type/product';

type RootStackParams = {
    HomeScreen: {
        showReview: boolean;
    };
    SubCollection: {
        parentId: number;
        title: string;
    };
    SearchResult: {
        categoryId: number;
        keyword: string;
        title: string;
        tag_id: number;

        /**
         * True nếu như category này không còn chilren nào nữa
         */
        lowest_child?: boolean;

        [x: string]: any;
    };
    FilterScreen: {
        currentFilter: Partial<ProductFilterArgs>;
        setFilter: any;
        filter: {
            Color: { id: number; name: string; text: string; color_code: string; slug: string; image_url: string }[];
            Size: { id: number; name: string; text: string }[];
            Type: { id: number; name: string; text: string }[];
        };
        priceRange: { from: number; to: number }[];
    };
};

export type HomeRouteProp = RouteProp<RootStackParams, 'HomeScreen'>;
export type SubCollectionRouteProp = RouteProp<RootStackParams, 'SubCollection'>;
export type SearchResultRouteProp = RouteProp<RootStackParams, 'SearchResult'>;
export type FilterScreenRouteProp = RouteProp<RootStackParams, 'FilterScreen'>;
