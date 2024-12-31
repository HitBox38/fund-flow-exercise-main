import React from "react";
import { BaseEdge, EdgeProps, getBezierPath } from "reactflow";

export function FundEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  ...rest
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge {...rest} path={edgePath} />
    </>
  );
}
