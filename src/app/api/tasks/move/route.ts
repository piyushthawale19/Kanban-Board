import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { taskId, fromColumn, toColumn } = await request.json();

    if (!taskId || !fromColumn || !toColumn) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (Math.random() < 0.2) {
      return NextResponse.json(
        { error: "Internal server error: database write failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      taskId,
      fromColumn,
      toColumn,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
