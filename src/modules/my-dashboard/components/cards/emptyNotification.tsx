import { Card, CardContent } from "@/components/ui/card"

export const EmptyNotification = () => {
    return (
        <Card className="flex flex-row justify-center items-center h-60 backdrop-filter backdrop-blur-3xl">
            <CardContent className="text-3xl text-center">
                <h1>No Notification Available 🐥</h1>
            </CardContent>
        </Card>
    )
}