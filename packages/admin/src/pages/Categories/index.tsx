import * as React from 'react';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
   List,
   TextField,
   Show,
   SimpleShowLayout,
   DateField,
   SimpleForm,
   TextInput,
   DateTimeInput,
   ReferenceInput,
   ImageInput,
   BooleanInput,
   AutocompleteInput,
   BooleanField,
   required,
   ImageField
} from 'react-admin';
import { P, clearUrl } from '@mapbul-pub/utils';
import { Routes } from '@mapbul-pub/ui';
import { SortedGrid, PosterInput } from 'components';
import { RowLayout, SectionTitle, Poster, ImageFile } from 'ui';
import { GlobalVar } from 'src/constants';
import { withCreatePage, withEditPage } from 'hocs';
import { ICategoryDTOEx } from 'interfaces';
import { FieldProps } from 'src/types';

// <SimpleList
//   primaryText={(record: ICategoryDTOEx) => record.name}
//   secondaryText={(record: ICategoryDTOEx) => record.id}
//   tertiaryText={(record: ICategoryDTOEx) => record.parentId}
// /></List>

export const CategoryList: React.FC = (props: any) => {
   const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
   return (
      <List title="All categories" {...props}>
         <SortedGrid {...props}>
            <TextField source={P<ICategoryDTOEx>((p) => p.id)} />
            <TextField source={P<ICategoryDTOEx>((p) => p.name)} />
            <TextField source={P<ICategoryDTOEx>((p) => p.enName)} />
            {!isSmall && <BooleanField source={P<ICategoryDTOEx>((p) => p.forArticle)} />}
         </SortedGrid>
      </List>
   );
};

export const CategoryShow: React.FC = (props: any) => (
   <Show {...props}>
      <SimpleShowLayout>
         <TextField source={P<ICategoryDTOEx>((p) => p.id)} />
         <TextField source={P<ICategoryDTOEx>((p) => p.parentId)} />
         <TextField source={P<ICategoryDTOEx>((p) => p.name)} />
         <TextField source={P<ICategoryDTOEx>((p) => p.enName)} />
         <DateField label="Added date" source={P<ICategoryDTOEx>((p) => p.addedDate)} />
      </SimpleShowLayout>
   </Show>
);

const CommonForm: React.FC<FieldProps<ICategoryDTOEx>> = (props) => {
   const { isEdit, record } = props;
   return (
      <SimpleForm {...props} redirect="list">
         <SectionTitle label="Main" />
         <RowLayout>
            <TextInput source={P<ICategoryDTOEx>((p) => p.id)} disabled fullWidth />
            <ReferenceInput
               source={P<ICategoryDTOEx>((p) => p.parentId)}
               reference={Routes.categories}
               perPage={1000}
               fullWidth
            >
               <AutocompleteInput optionText={P<ICategoryDTOEx>((p) => p.name)} defaultValue="1" />
            </ReferenceInput>
         </RowLayout>
         <RowLayout>
            <TextInput source={P<ICategoryDTOEx>((p) => p.name)} validate={required()} fullWidth />
            <TextInput source={P<ICategoryDTOEx>((p) => p.enName)} defaultValue="" fullWidth />
         </RowLayout>
         <BooleanInput
            source={P<ICategoryDTOEx>((p) => p.forArticle)}
            defaultValue={false}
            fullWidth
         />
         <SectionTitle label="Misc" />
         <RowLayout style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Box style={{ width: '100%' }}>
               <PosterInput
                  imageFile={P<ICategoryDTOEx>((p) => p.iconFile)}
                  image={P<ICategoryDTOEx>((p) => p.icon)}
                  label="icon"
                  isEdit={isEdit}
                  imageSource={record?.icon}
                  validate={required()}
               />
            </Box>
            <Box style={{ width: '100%' }}>
               <PosterInput
                  imageFile={P<ICategoryDTOEx>((p) => p.pinFile)}
                  image={P<ICategoryDTOEx>((p) => p.pin)}
                  label="pin"
                  isEdit={isEdit}
                  imageSource={record?.pin}
                  validate={required()}
               />
            </Box>
         </RowLayout>
         <RowLayout>
            <DateTimeInput
               source={P<ICategoryDTOEx>((p) => p.addedDate)}
               defaultValue={new Date()}
               fullWidth
            />
            <TextInput source={P<ICategoryDTOEx>((p) => p.color)} validate={required()} fullWidth />
         </RowLayout>
      </SimpleForm>
   );
};

export const CategoryCreate = withCreatePage(CommonForm);

export const CategoryEdit = withEditPage<ICategoryDTOEx>(CommonForm);
