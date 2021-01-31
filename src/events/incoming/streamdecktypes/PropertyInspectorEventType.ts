import { Type } from '@sinclair/typebox';

export const PropertyInspectorEventType = Type.Object({
  action: Type.String(),
  event: Type.String({ pattern: 'propertyInspectorDidAppear|propertyInspectorDidDisappear' }),
  context: Type.String(),
  device: Type.String(),
});

export const PropertyInspectorDidAppearEventType = Type.Intersect([
  PropertyInspectorEventType,
  Type.Object({
    event: Type.String({ pattern: 'propertyInspectorDidAppear' }),
  }),
]);

export const PropertyInspectorDidDisppearEventType = Type.Intersect([
  PropertyInspectorEventType,
  Type.Object({
    event: Type.String({ pattern: 'propertyInspectorDidDisappear' }),
  }),
]);
